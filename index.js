module.exports = ({ manifest }) => ({
  markup({ content, filename }) {
    const files = manifest[filename];

    if (files) {
      const headTag = '<svelte:head>';
      const tags = headTag + '\n' + files.map(preloadLink).filter(v => v).join('\n') + '\n';

      content = content.includes(headTag)
        ? content.replace(headTag, tags)
        : tags + '</svelte:head>\n' + content;
    }

    return {
      code: content
    };
  }
});

function preloadLink(href) {
  const ext = href.split('.').pop();
  let rel = 'preload';
  let as = '';

  if (ext === 'js') {
    as = 'script';
    rel = 'modulepreload';
  } else if (ext === 'css') {
    as = 'style';
  }

  return as && `<link rel="${rel}" href="${href}" as="${as}">`;
}
