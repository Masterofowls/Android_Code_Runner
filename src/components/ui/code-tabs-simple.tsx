import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'
import * as React from 'react'

interface CodeTabsProps {
  codes: Record<string, string>
  defaultValue?: string
  className?: string
  onCopy?: (content: string) => void
}

export function CodeTabs({ codes, defaultValue, className, onCopy }: CodeTabsProps) {
  const [copied, setCopied] = React.useState<string | null>(null)

  const tabs = Object.entries(codes)
  const firstKey = tabs[0]?.[0]
  const activeDefault = defaultValue || firstKey

  const handleCopy = async (language: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(language)
      onCopy?.(content)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!tabs.length) {
    return null
  }

  return (
    <Tabs defaultValue={activeDefault} className={cn('w-full', className)}>
      <TabsList>
        {tabs.map(([language]) => (
          <TabsTrigger key={language} value={language}>
            {language}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map(([language, code]) => (
        <TabsContent key={language} value={language} className="relative">
          <div className="relative">
            <pre className="rounded-lg bg-neutral-950 p-4 overflow-x-auto">
              <code className="text-neutral-50 text-sm">{code}</code>
            </pre>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => handleCopy(language, code)}
            >
              {copied === language ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
