import type { WebGLRenderer } from "three";

// The same programs are compiled before their first draw. KHR completion queries
// avoid waiting synchronously for the driver; cancellation keeps teardown safe.
export function warmRenderer(
  renderer: WebGLRenderer,
  jobs: (() => void)[],
  ready: () => void,
  failed: () => void = ready,
) {
  let cancelled = false;
  let timer: ReturnType<typeof setTimeout>;
  const gl = renderer.getContext();
  const parallel = gl.getExtension("KHR_parallel_shader_compile");
  let index = 0;
  const poll = () => {
    if (cancelled) return;
    const programs = renderer.info.programs as { program: WebGLProgram }[] | null;
    if (
      !parallel ||
      !programs ||
      programs.every(({ program }) =>
        gl.getProgramParameter(program, parallel.COMPLETION_STATUS_KHR),
      )
    )
      ready();
    else timer = setTimeout(poll, 16);
  };
  const next = () => {
    if (cancelled) return;
    try {
      jobs[index++]();
      timer = setTimeout(index < jobs.length ? next : poll, 0);
    } catch {
      if (!cancelled) failed();
    }
  };
  timer = setTimeout(next, 0);
  return () => {
    cancelled = true;
    clearTimeout(timer);
  };
}
