import "photoswipe/style.css";

export type ViewerPhoto = {
  src: string;
  alt: string;
  /** Handwritten line shown under the photo. */
  caption?: string;
  /** Longer aside shown under the caption. */
  note?: string;
};

/** PhotoSwipe needs each photo's size up front; read it from the file. */
async function measure(src: string) {
  const img = new window.Image();
  img.src = src;
  await img.decode().catch(() => {});
  return { width: img.naturalWidth || 1600, height: img.naturalHeight || 1067 };
}

/**
 * Opens photos in a full-screen viewer that behaves like a phone's photo app:
 * swipe between photos, pinch to zoom, drag down to close.
 */
export async function openPhotoViewer(
  photos: ViewerPhoto[],
  index: number,
  onClose?: () => void,
) {
  const [{ default: PhotoSwipe }, sizes] = await Promise.all([
    import("photoswipe"),
    Promise.all(photos.map((p) => measure(p.src))),
  ]);

  const pswp = new PhotoSwipe({
    dataSource: photos.map((p, i) => ({ ...p, ...sizes[i] })),
    index,
    bgOpacity: 0.94,
    showHideAnimationType: "fade",
    closeOnVerticalDrag: true,
    wheelToZoom: true,
    padding: { top: 24, bottom: 96, left: 0, right: 0 },
  });

  pswp.on("uiRegister", () => {
    pswp.ui?.registerElement({
      name: "caption",
      appendTo: "root",
      onInit: (el) => {
        pswp.on("change", () => {
          const data = pswp.currSlide?.data as ViewerPhoto | undefined;
          el.replaceChildren();
          if (data?.caption) {
            const line = document.createElement("p");
            line.className = "pswp__caption-title";
            line.textContent = data.caption;
            el.append(line);
          }
          if (data?.note) {
            const note = document.createElement("p");
            note.className = "pswp__caption-note";
            note.textContent = data.note;
            el.append(note);
          }
        });
      },
    });
  });
  if (onClose) pswp.on("destroy", onClose);
  pswp.init();
}
