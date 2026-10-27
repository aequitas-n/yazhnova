export interface RasterStoryInput {
  current: { canvas: HTMLCanvasElement | null; assemble: number; reveal: number; version: number };
}
export interface ArchitectureGraph {
  current: {
    nodes: { id: string; x: number; y: number }[];
    edges: [string, string][];
    route: string[];
    time: number;
    hovered: string | null;
  };
}
