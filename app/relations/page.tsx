// app/relations/page.tsx

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { RelationCard } from '@/components/RelationCard';
import { Plus, Search, User, Users } from 'lucide-react';
import { mockPersons } from '@/mockData';

export default function RelationsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 space-y-6 p-6">
          <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Relations</h1>
              <p className="text-muted-foreground">
                Manage and organize your connections with family and friends
              </p>
            </div>
            <Link href="/relations/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Relation
              </Button>
            </Link>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
                  <div>
                    <CardTitle>Your Relations</CardTitle>
                    <CardDescription>
                      Keep track of important people in your life
                    </CardDescription>
                  </div>
                  <div className="flex w-full items-center space-x-2 md:w-auto">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search relations..."
                        className="pl-8"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="family">Family</TabsTrigger>
                    <TabsTrigger value="friends">Friends</TabsTrigger>
                    <TabsTrigger value="caregivers">Caregivers</TabsTrigger>
                    <TabsTrigger value="medical">Medical</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {mockPersons.map((person) => (
                        <RelationCard key={person.id} person={person} />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="family" className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {mockPersons
                        .filter((person) => person.relationship === 'family')
                        .map((person) => (
                          <RelationCard key={person.id} person={person} />
                        ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="friends" className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {mockPersons
                        .filter((person) => person.relationship === 'friend')
                        .map((person) => (
                          <RelationCard key={person.id} person={person} />
                        ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="caregivers" className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {mockPersons
                        .filter((person) => person.relationship === 'caregiver')
                        .map((person) => (
                          <RelationCard key={person.id} person={person} />
                        ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="medical" className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {mockPersons
                        .filter((person) => person.relationship === 'medical')
                        .map((person) => (
                          <RelationCard key={person.id} person={person} />
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Relation Statistics</CardTitle>
                <CardDescription>
                  Summary of your relationship network
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center gap-4 rounded-lg border p-4">
                    <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Relations</p>
                      <p className="text-2xl font-bold">{mockPersons.length}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 rounded-lg border p-4">
                    <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Family Members</p>
                      <p className="text-2xl font-bold">
                        {mockPersons.filter((p) => p.relationship === 'family').length}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 rounded-lg border p-4">
                    <div className="rounded-full bg-green-100 p-3 text-green-600">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Friends</p>
                      <p className="text-2xl font-bold">
                        {mockPersons.filter((p) => p.relationship === 'friend').length}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 rounded-lg border p-4">
                    <div className="rounded-full bg-red-100 p-3 text-red-600">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Medical Contacts</p>
                      <p className="text-2xl font-bold">
                        {mockPersons.filter((p) => p.relationship === 'medical').length}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}