import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { climbFilm } from "../config/climbFilm";
import { projects } from "../config/projects";
import { timeline } from "../config/timeline";

const publicFile = (src: string) => join(process.cwd(), "public", src);

describe("climb content", () => {
  it("references only images that exist in public/", () => {
    const srcs = [
      ...projects.flatMap((p) => [p.icon, ...p.media]),
      ...timeline.flatMap((m) => (m.lifePhoto ? [m.lifePhoto] : [])),
      ...climbFilm.map((f) => f.src),
    ].filter((s) => s.startsWith("/"));
    const missing = srcs.filter((s) => !existsSync(publicFile(s)));
    expect(missing).toEqual([]);
  });

  it("links every milestone project to a real project slug", () => {
    const slugs = new Set(projects.map((p) => p.slug));
    const unknown = timeline.flatMap((m) =>
      (m.projects ?? []).filter((s) => !slugs.has(s)),
    );
    expect(unknown).toEqual([]);
  });

  it("keeps timeline and film frames in route order", () => {
    const ts = timeline.map((m) => m.landmark.t);
    expect(ts).toEqual([...ts].sort((a, b) => a - b));
    const ft = climbFilm.map((f) => f.t);
    expect(ft).toEqual([...ft].sort((a, b) => a - b));
  });
});
