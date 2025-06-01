'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  MessageCircle, 
  Send, 
  Search, 
  MoreVertical, 
  Phone, 
  Video,
  Paperclip,
  Smile,
  User
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Message {
  id: string
  content: string
  senderId: string
  receiverId: string
  createdAt: string
  isRead: boolean
}

interface Conversation {
  id: string
  participants: {
    id: string
    firstName: string
    lastName: string
    avatar?: string
    role: string
  }[]
  lastMessage?: Message
  unreadCount: number
}

export default function MessagesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/auth/signin?callbackUrl=/messages')
      return
    }

    loadConversations()
  }, [session, status, router])

  const loadConversations = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockConversations: Conversation[] = [
        {
          id: '1',
          participants: [
            {
              id: '2',
              firstName: 'Sarah',
              lastName: 'Wilson',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100',
              role: 'PHOTOGRAPHER'
            }
          ],
          lastMessage: {
            id: '1',
            content: 'Hi! I\'d love to discuss your wedding photography needs.',
            senderId: '2',
            receiverId: session?.user?.id || '',
            createdAt: new Date().toISOString(),
            isRead: false
          },
          unreadCount: 2
        },
        {
          id: '2',
          participants: [
            {
              id: '3',
              firstName: 'Michael',
              lastName: 'Chen',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
              role: 'PHOTOGRAPHER'
            }
          ],
          lastMessage: {
            id: '2',
            content: 'The photos from your session are ready for review!',
            senderId: '3',
            receiverId: session?.user?.id || '',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            isRead: true
          },
          unreadCount: 0
        }
      ]
      
      setConversations(mockConversations)
      if (mockConversations.length > 0) {
        setSelectedConversation(mockConversations[0].id)
        loadMessages(mockConversations[0].id)
      }
    } catch (error) {
      console.error('Failed to load conversations:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async (conversationId: string) => {
    try {
      // Mock messages - replace with actual API call
      const mockMessages: Message[] = [
        {
          id: '1',
          content: 'Hi! I saw your portfolio and I\'m interested in booking you for my wedding.',
          senderId: session?.user?.id || '',
          receiverId: '2',
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          isRead: true
        },
        {
          id: '2',
          content: 'Thank you for reaching out! I\'d love to help capture your special day. When is your wedding date?',
          senderId: '2',
          receiverId: session?.user?.id || '',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          isRead: true
        },
        {
          id: '3',
          content: 'It\'s on June 15th, 2024. We\'re looking for full day coverage.',
          senderId: session?.user?.id || '',
          receiverId: '2',
          createdAt: new Date(Date.now() - 43200000).toISOString(),
          isRead: true
        },
        {
          id: '4',
          content: 'Perfect! I have that date available. Let me send you my wedding package details.',
          senderId: '2',
          receiverId: session?.user?.id || '',
          createdAt: new Date().toISOString(),
          isRead: false
        }
      ]
      
      setMessages(mockMessages)
    } catch (error) {
      console.error('Failed to load messages:', error)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return

    try {
      // Mock sending - replace with actual API call
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage,
        senderId: session?.user?.id || '',
        receiverId: '2', // This should be dynamic
        createdAt: new Date().toISOString(),
        isRead: false
      }

      setMessages(prev => [...prev, message])
      setNewMessage('')
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' })
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  const selectedConv = conversations.find(c => c.id === selectedConversation)
  const otherParticipant = selectedConv?.participants[0]

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 8rem)' }}>
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <h1 className="text-xl font-semibold text-gray-900 mb-4">Messages</h1>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                  <div className="p-8 text-center">
                    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                    <p className="text-gray-600">Start a conversation with a photographer</p>
                  </div>
                ) : (
                  conversations.map((conversation) => {
                    const participant = conversation.participants[0]
                    return (
                      <div
                        key={conversation.id}
                        onClick={() => {
                          setSelectedConversation(conversation.id)
                          loadMessages(conversation.id)
                        }}
                        className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                          selectedConversation === conversation.id ? 'bg-primary-50' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {participant.avatar ? (
                            <img
                              src={participant.avatar}
                              alt={participant.firstName}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                              <User className="w-6 h-6 text-gray-600" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium text-gray-900 truncate">
                                {participant.firstName} {participant.lastName}
                              </h3>
                              {conversation.lastMessage && (
                                <span className="text-xs text-gray-500">
                                  {formatTime(conversation.lastMessage.createdAt)}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-600 truncate">
                                {conversation.lastMessage?.content || 'No messages yet'}
                              </p>
                              {conversation.unreadCount > 0 && (
                                <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                  {conversation.unreadCount}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation && otherParticipant ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {otherParticipant.avatar ? (
                        <img
                          src={otherParticipant.avatar}
                          alt={otherParticipant.firstName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                      )}
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                          {otherParticipant.firstName} {otherParticipant.lastName}
                        </h2>
                        <p className="text-sm text-gray-600 capitalize">
                          {otherParticipant.role.toLowerCase()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                        <Phone className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                        <Video className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => {
                      const isOwn = message.senderId === session?.user?.id
                      return (
                        <div key={message.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            isOwn 
                              ? 'bg-primary-600 text-white' 
                              : 'bg-gray-200 text-gray-900'
                          }`}>
                            <p>{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              isOwn ? 'text-primary-100' : 'text-gray-500'
                            }`}>
                              {formatTime(message.createdAt)}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                          placeholder="Type a message..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-600 hover:text-gray-900">
                          <Smile className="w-5 h-5" />
                        </button>
                      </div>
                      <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-gray-600">
                      Choose a conversation from the list to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
