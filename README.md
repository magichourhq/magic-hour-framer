# Magic Hour for Framer

A [Framer](https://www.framer.com) plugin that generates a short video with the [Magic Hour API](https://docs.magichour.ai) and adds it to your project.

1. Enter your Magic Hour API key. It is the key of the person using the plugin.
2. Select an image in Framer and click **Use selected image**, upload a PNG, JPEG or WebP, or leave the image out and write a creative brief for text-to-video.
3. Pick a duration and resolution, review the privacy disclosure and check the consent box, then generate.
4. Preview the result and click **Add video to design**. The plugin uploads the MP4 as a Framer file and inserts Framer's Video component at the video's aspect ratio, playing, looping and muted. The source image stays in place.

The accepted project ID is kept in browser session storage, scoped to the current Framer user and project, so you can close the plugin and resume the same project without another generation charge. You can also enter an existing Magic Hour project ID.

The generation logic comes from [`@magichourhq/editor-kit`](https://github.com/magichourhq/editor-kit), which has no UI. This repo has its own plain-HTML panel in `src/panel.ts` and `src/style.css`, built on `DesignVideo.VideoPanel`, plus the Framer side: `src/host.ts` reads the selected image and inserts the video, and `src/main.ts` opens the plugin window.

## Development

```sh
yarn install
yarn dev
```

Open the development plugin through Framer's [development plugin launcher](https://framer.com/plugins/open). You must be signed in to Framer and the project must be editable. To serve over trusted HTTPS, set `LOCAL_TLS_KEY` and `LOCAL_TLS_CERT` to the paths of your certificate files before `yarn dev`.

| Command | What it does |
| --- | --- |
| `yarn check` | Type-check |
| `yarn test` | Run the tests (no network) |
| `yarn build` | Build the plugin into `dist/` |
| `yarn package` | Build and write `plugin.zip` for the Framer Marketplace |

## Release

Nothing is published automatically. The upload to Framer is manual.

1. Bump `version` in `package.json` in a pull request and merge it to `main`.
2. The **Release** workflow builds the plugin and creates a GitHub release `v<version>` with `plugin.zip` attached.
3. Download `plugin.zip` from that release.
4. In the [Framer Marketplace plugin dashboard](https://www.framer.com/marketplace/dashboard/plugins/), open the plugin (or choose **New Plugin** for a first submission), upload `plugin.zip`, and submit.

You can also run **Release** by hand from the Actions tab to build a release for the current version.

## License

MIT
