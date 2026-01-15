import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Bot, User, Loader2, AlertCircle, Sparkles } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const WEBHOOK_URL = 'https://jola249-20249.wykr.es/webhook/bubblebot';

export const ToolsBot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const generateId = () => `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    const sendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = {
            id: generateId(),
            role: 'user',
            content: inputValue.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chatInput: userMessage.content,
                }),
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();

            const assistantMessage: Message = {
                id: generateId(),
                role: 'assistant',
                content: data.output || 'No response received.',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (err) {
            console.error('Chatbot error:', err);
            setError('Failed to send message. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const retryLastMessage = () => {
        setError(null);
        const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
        if (lastUserMessage) {
            setInputValue(lastUserMessage.content);
            setMessages((prev) => prev.filter((m) => m.id !== lastUserMessage.id));
        }
    };

    return (
        <section className="w-full">
            <div className="gradient-border bg-card rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="p-5 border-b border-border bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                            <h3 className="font-display font-semibold text-lg">AI Assistant</h3>
                            <p className="text-sm text-muted-foreground">Powered by AI • Ask anything</p>
                        </div>
                    </div>
                </div>

                {/* Messages Area */}
                <ScrollArea className="h-[400px]">
                    <div ref={scrollRef} className="p-5 space-y-4">
                        {messages.length === 0 && !isLoading && (
                            <div className="flex flex-col items-center justify-center h-[300px] text-center">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                                    <Bot className="w-8 h-8 text-primary" />
                                </div>
                                <h4 className="font-display font-semibold text-lg mb-2">Start a conversation</h4>
                                <p className="text-muted-foreground text-sm max-w-xs">
                                    Ask me anything about AI tools, prompts, or get help with your workflow.
                                </p>
                            </div>
                        )}

                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex gap-3 animate-fade-in ${message.role === 'user' ? 'flex-row-reverse' : ''
                                    }`}
                            >
                                <div
                                    className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${message.role === 'user'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-gradient-to-br from-primary/20 to-accent/20 text-primary'
                                        }`}
                                >
                                    {message.role === 'user' ? (
                                        <User className="w-4 h-4" />
                                    ) : (
                                        <Bot className="w-4 h-4" />
                                    )}
                                </div>
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                        ? 'bg-primary text-primary-foreground rounded-tr-md'
                                        : 'bg-secondary text-secondary-foreground rounded-tl-md'
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                                    <span className="text-[10px] opacity-60 mt-1 block">
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {/* Loading Indicator */}
                        {isLoading && (
                            <div className="flex gap-3 animate-fade-in">
                                <div className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-primary" />
                                </div>
                                <div className="bg-secondary rounded-2xl rounded-tl-md px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 text-primary animate-spin" />
                                        <span className="text-sm text-muted-foreground">Thinking...</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive animate-fade-in">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span className="text-sm flex-1">{error}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={retryLastMessage}
                                    className="text-destructive hover:text-destructive hover:bg-destructive/20"
                                >
                                    Retry
                                </Button>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
                    <div className="flex gap-3">
                        <Textarea
                            ref={textareaRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message..."
                            disabled={isLoading}
                            className="min-h-[48px] max-h-[120px] resize-none bg-secondary border-border focus:border-primary/50"
                            rows={1}
                        />
                        <Button
                            onClick={sendMessage}
                            disabled={!inputValue.trim() || isLoading}
                            size="icon"
                            className="h-12 w-12 shrink-0 rounded-xl"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Send className="w-5 h-5" />
                            )}
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                        Press Enter to send, Shift+Enter for new line
                    </p>
                </div>
            </div>
        </section>
    );
};
