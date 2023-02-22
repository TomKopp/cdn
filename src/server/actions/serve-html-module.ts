import etag from 'etag';
import { load } from 'cheerio';

import getContentTypeHeader from '../utils/get-content-type-header';
import rewriteBareModuleIdentifiers from '../utils/rewrite-bare-module-identifiers';

export default function serveHTMLModule(req, res) {
  try {
    const $ = load(req.entry.content.toString('utf8'));

    $('script[type=module]').each((index, element) => {
      $(element).html(
        rewriteBareModuleIdentifiers($(element).html(), req.packageConfig)
      );
    });

    const code = $.html();

    res
      .set({
        'Content-Length': Buffer.byteLength(code),
        'Content-Type': getContentTypeHeader(req.entry.contentType),
        'Cache-Control': 'public, max-age=31536000', // 1 year
        ETag: etag(code),
        'Cache-Tag': 'file, html-file, html-module'
      })
      .send(code);
  } catch (error) {
    console.error(error);

    const errorName = error.constructor.name;
    const errorMessage = error.message.replace(
      /^.*?\/unpkg-.+?\//,
      `/${req.packageSpec}/`
    );
    const codeFrame = error.codeFrame;
    const debugInfo = `${errorName}: ${errorMessage}\n\n${codeFrame}`;

    res
      .status(500)
      .type('text')
      .send(
        `Cannot generate module for ${req.packageSpec}${req.filename}\n\n${debugInfo}`
      );
  }
}
