export type VideoSceneDataType = {
  preview: string | null;
  live: string | null;
  opts: {
    loop: boolean;
    autoplay: boolean;
  };
  files: {
    name: string;
    start?: string;
  }[];
};