export function downloadTextFile(filename: string, contents: string, type = 'application/json'): void {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export async function copyText(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}

export async function shareOrDownload(
  filename: string,
  contents: string,
): Promise<'shared' | 'downloaded' | 'copied'> {
  const blob = new Blob([contents], { type: 'application/json' });
  const file = new File([blob], filename, { type: 'application/json' });
  const nav = navigator as Navigator & {
    canShare?: (data?: ShareData) => boolean;
  };
  if (nav.share && (!nav.canShare || nav.canShare({ files: [file] }) || nav.canShare({ text: contents }))) {
    try {
      if (nav.canShare?.({ files: [file] })) {
        await nav.share({ files: [file], title: 'BulkTrack JSON', text: filename });
      } else {
        await nav.share({ title: 'BulkTrack JSON', text: contents });
      }
      return 'shared';
    } catch (error) {
      if ((error as { name?: string }).name === 'AbortError') return 'shared';
    }
  }
  if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
    await copyText(contents);
    return 'copied';
  }
  downloadTextFile(filename, contents);
  return 'downloaded';
}
