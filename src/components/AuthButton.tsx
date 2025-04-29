'use client'

import {signIn, signOut, useSession} from 'next-auth/react'
import {Button} from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {LogOut, User} from 'lucide-react'

export function AuthButton() {
  const {data: session} = useSession()

  if (!session) {
    return (
      <Button onClick={() => signIn()} variant="outline" size="sm">
        Provider Portal
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={session.user?.image ?? ''}
              alt={session.user?.name ?? ''}
            />
            <AvatarFallback>
              <User className="h-4 w-4"/>
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="flex items-center" onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4"/>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}