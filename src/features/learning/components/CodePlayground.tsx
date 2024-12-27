import React from 'react';
import Editor from '@monaco-editor/react';

interface CodePlaygroundProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function CodePlayground({ value = '', onChange }: CodePlaygroundProps) {
  return (
    <div className="rounded-lg border border-[#00ff41]">
      <Editor
        height="400px"
        defaultLanguage="javascript"
        value={value}
        onChange={(value) => onChange?.(value || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: true,
          scrollBeyondLastLine: false,
          automaticLayout: true
        }}
      />
    </div>
  );
}