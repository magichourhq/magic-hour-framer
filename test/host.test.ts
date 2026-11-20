import { expect, test } from "vitest";
import type { VideoResult } from "@magichourhq/design-video";
import { framerHost } from "../src/host";

const result: VideoResult = {
  id: "existing-video",
  blob: new Blob(["video"], { type: "video/mp4" }),
  url: "https://media.example/video.mp4",
  expiresAt: "2030-01-01T00:00:00Z",
  credits: 24,
};

test("Framer copies output bytes into a native file asset and inserts a muted looping video", async () => {
  let uploads = 0;
  const inserts: any[] = [];
  const host = framerHost(
    {
      getImage: async () => null,
      getPluginData: async () => null,
      setPluginData: async () => {},
      uploadFile: async (input) => {
        uploads++;
        expect((input as any).file).toBeInstanceOf(File);
        return { id: "file-id" } as any;
      },
      addComponentInstance: async (input) => {
        inserts.push(input);
        return {} as any;
      },
    },
    async () => ({ poster: "data:image/jpeg;base64,aA==", width: 640, height: 640 })
  );
  await expect(host.captureImage!()).rejects.toThrow(/Select one image/);
  await host.insertVideo(result);
  await host.insertVideo(result);
  expect(uploads).toBe(1);
  expect(inserts[0].attributes.controls.srcFile.id).toBe("file-id");
  expect(inserts[0].attributes.controls.loop).toBe(true);
  expect(inserts[0].attributes.controls.muted).toBe(true);
});
