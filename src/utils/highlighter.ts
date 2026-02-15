export function applySyntaxHighlighting(code: string, language: string): string {
  // Basic syntax highlighting without external library
  // For production, integrate with Prism.js or Monaco Editor

  const keywords: Record<string, RegExp> = {
    javascript: /\b(function|const|let|var|return|if|else|for|while|class|async|await|try|catch|finally|import|export|from|as|typeof|instanceof|new|this|super|static|extends|implements|interface)\b/g,
    typescript: /\b(function|const|let|var|return|if|else|for|while|class|async|await|try|catch|finally|import|export|from|as|typeof|instanceof|new|this|super|static|extends|implements|interface|enum|namespace|type|declare|abstract|readonly|private|protected|public)\b/g,
    python: /\b(def|class|return|if|elif|else|for|while|try|except|finally|with|import|from|as|async|await|lambda|yield|pass|break|continue|global|nonlocal|assert|raise|and|or|not|in|is|True|False|None)\b/g,
    c: /\b(int|char|float|double|void|struct|union|enum|typedef|unsigned|signed|static|const|volatile|extern|return|if|else|for|while|do|switch|case|break|continue|default|goto|sizeof)\b/g,
    cpp: /\b(int|char|float|double|void|struct|union|enum|class|typename|template|virtual|public|private|protected|static|const|volatile|extern|return|if|else|for|while|do|switch|case|break|continue|default|goto|sizeof|new|delete|this|using|namespace|std)\b/g,
  }

  let highlighted = code

  // Highlight keywords
  if (keywords[language]) {
    highlighted = highlighted.replace(
      keywords[language],
      '<span class="keyword">$1</span>'
    )
  }

  // Highlight strings
  highlighted = highlighted.replace(
    /(['"`])(?:(?=(\\?))\2.)*?\1/g,
    '<span class="string">$&</span>'
  )

  // Highlight comments
  highlighted = highlighted.replace(
    /(\/\/.*|\/\*[\s\S]*?\*\/|#.*)/g,
    '<span class="comment">$1</span>'
  )

  return highlighted
}

export function getLanguageDisplayName(language: string): string {
  const names: Record<string, string> = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    python: 'Python',
    c: 'C',
    cpp: 'C++',
  }
  return names[language] || language
}
