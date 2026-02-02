import * as React from "react"
import { Input } from "./input"
import { Badge } from "./badge"
import { Button } from "./button"
import { X } from "lucide-react"

type UrlTagsInputProps = {
    value: string[]
    onChange: (next: string[]) => void
    disabled?: boolean
    placeholder?: string
    allowLocalhost?: boolean
    /** When false, accepts any non-empty trimmed string (for paths/patterns). Default true. */
    validateAsUrl?: boolean
}

/** Result of strict URL normalization (single source of truth for URL parsing). */
export type NormalizeUrlResult =
    | { ok: true; value: string }
    | { ok: false; reason: string }

/**
 * Normalizes a single URL the same way as the tag input: trim, remove internal
 * whitespace, fix partial schemes, add https if missing, validate http(s), hostname, strip trailing slash.
 */
export function normalizeUrlStrict(raw: string, allowLocalhost = false): NormalizeUrlResult {
    let s = raw.trim()
    if (!s) return { ok: false as const, reason: "Empty" }

    // Remove internal whitespace
    s = s.replace(/\s+/g, "")

    // Fix common partial schemes like "https:/example.com"
    s = s.replace(/^https:\/(?!\/)/i, "https://")
    s = s.replace(/^http:\/(?!\/)/i, "http://")

    // If no scheme, assume https
    const hasScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(s)
    if (!hasScheme) s = `https://${s}`

    try {
        const u = new URL(s)

        // Only allow http(s)
        if (u.protocol !== "http:" && u.protocol !== "https:") {
            return { ok: false as const, reason: "Only http/https URLs are allowed" }
        }

        const host = u.hostname
        const hostnameLooksValid =
            host === "localhost"
                ? allowLocalhost
                : host.includes(".") && !host.startsWith(".") && !host.endsWith(".")

        if (!hostnameLooksValid) {
            return { ok: false as const, reason: "That does not look like a valid domain" }
        }

        // Clean trailing slash for bare domains
        let out = u.toString()
        if (out.endsWith("/") && (u.pathname === "/" || u.pathname === "")) {
            out = out.slice(0, -1)
        }

        return { ok: true as const, value: out }
    } catch {
        return { ok: false as const, reason: "Invalid URL" }
    }
}

export function UrlTagsInput({
    value,
    onChange,
    disabled,
    placeholder,
    allowLocalhost = false,
    validateAsUrl = true,
}: UrlTagsInputProps) {
    const [input, setInput] = React.useState("")
    const [localError, setLocalError] = React.useState<string | null>(null)

    function addFromInput(raw: string) {
        const parts = raw.split(/[\r\n,]+/).map((s) => s.trim()).filter(Boolean)
        if (parts.length === 0) return

        if (validateAsUrl) {
            let lastError: string | null = null
            const next = [...value]
            for (const p of parts) {
                const res = normalizeUrlStrict(p, allowLocalhost)
                if (!res.ok) {
                    lastError = res.reason
                    continue
                }
                const normalized = res.value
                if (!next.some((v) => v.toLowerCase() === normalized.toLowerCase())) {
                    next.push(normalized)
                }
            }
            if (next.length > value.length) onChange(next)
            setLocalError(lastError)
        } else {
            const next = [...value]
            for (const p of parts) {
                if (!next.some((v) => v === p)) next.push(p)
            }
            onChange(next)
            setLocalError(null)
        }

        setInput("")
    }

    function remove(tag: string) {
        onChange(value.filter((v) => v !== tag))
    }

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
                <Input
                    value={input}
                    placeholder={placeholder}
                    disabled={disabled}
                    // className="flex-1 min-w-[200px] h-9"
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === ",") {
                            e.preventDefault()
                            if (input.trim()) addFromInput(input)
                        }
                        if (e.key === "Backspace" && !input && value.length) {
                            const last = value[value.length - 1]
                            if (last !== undefined) remove(last)
                        }
                    }}
                    onBlur={() => {
                        if (input.trim()) addFromInput(input)
                    }}
                />
                {value.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1 pr-1 shrink-0">
                        <span className="max-w-[280px] truncate text-xs">{tag}</span>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 shrink-0 rounded-full"
                            onClick={() => remove(tag)}
                            disabled={disabled}
                            aria-label={`Remove ${tag}`}
                        >
                            <X className="h-3 w-3" />
                        </Button>
                    </Badge>
                ))}
            </div>
            {localError ? <p className="text-sm text-destructive mt-0.5">{localError}</p> : null}
        </div>
    )
}
