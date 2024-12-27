import { useEffect } from 'react';
import { loader } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

const matrixTheme: editor.IStandaloneThemeData = {
  base: 'vs-dark' as const,
  inherit: true,
  rules: [
    { token: 'comment', foreground: '4C9855' },
    { token: 'string', foreground: '24FF00' }
  ],
  colors: {
    'editor.background': '#0D0208',
    'editor.foreground': '#00FF41',
    'editor.lineHighlightBackground': '#00FF4120',
    'editor.selectionBackground': '#00FF4140',
    'editorCursor.foreground': '#00FF41',
    'editorLineNumber.foreground': '#00FF4180'
  }
};

export function useMonacoTheme() {
  useEffect(() => {
    loader.init().then(monaco => {
      monaco.editor.defineTheme('matrix', matrixTheme);
      monaco.editor.setTheme('matrix');
    });
  }, []);
}
