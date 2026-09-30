// Keep legacy Markdown untouched; adapt presentation at compile time.
import { fromMarkdown } from 'mdast-util-from-markdown';
import { math } from 'micromark-extension-math';
import { mathFromMarkdown } from 'mdast-util-math';
import katex from 'katex';
export default function legacyNotes() {
  return (tree, file) => {
    function visit(parent) {
      parent.children = parent.children.flatMap(node => {
        if (node.type === 'code' && node.lang === 'note') {
          const parsed = fromMarkdown(node.value, { extensions: [math()], mdastExtensions: [mathFromMarkdown()] });
          function renderMath(parent) {
            parent.children = parent.children.map(child => {
              if (child.type === 'inlineMath' || child.type === 'math') {
                return { type: 'html', value: katex.renderToString(child.value, { displayMode: child.type === 'math', throwOnError: true, trust: false }) };
              }
              if (child.children) renderMath(child);
              return child;
            });
          }
          renderMath(parsed);
          return [{ type: 'blockquote', children: parsed.children }];
        }
        if (node.type === 'code' && node.lang === 'bash') {
          if (String(file.path).includes('modern-robotics.md')) node.lang = 'matlab';
          if (String(file.path).includes('pybullet-pd-control.md')) node.lang = 'python';
        }
        if (node.children) visit(node);
        return [node];
      });
    }
    if (String(file.path).includes('lie-group/introduction.md')) {
      tree.children = tree.children.filter((node, index) => !(index === 0 && node.type === 'heading' && node.depth === 1));
    }
    visit(tree);
  };
}
