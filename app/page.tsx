// app/page.tsx
'use client'
import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

import { mockPersons, mockReminders, mockAlerts, mockUser } from '@/mockData';
import { ArrowRight, BellRing, Brain, Calendar, Clock, Plus, User } from 'lucide-react';
import { formatLastSeen, getPriorityColor, getReminderIcon } from '@/helperFn';

export default function DashboardPage() {
    // Get today's reminders
    const todayReminders = mockReminders.filter(reminder => {
        const reminderDate = new Date(reminder.dateTime);
        const today = new Date();
        return (
            reminderDate.getDate() === today.getDate() &&
            reminderDate.getMonth() === today.getMonth() &&
            reminderDate.getFullYear() === today.getFullYear()
        );
    });

    // Get active alerts
    const activeAlerts = mockAlerts.filter(alert => alert.active);

    // Get recently seen persons
    const recentPersons = [...mockPersons]
        .filter(person => person.lastSeen)
        .sort((a, b) => {
            return new Date(b.lastSeen!).getTime() - new Date(a.lastSeen!).getTime();
        })
        .slice(0, 3);

    return (
        <main className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar />
                <div className="flex-1 space-y-6 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Good Morning, {mockUser.name}</h1>
                            <p className="text-muted-foreground">
                                Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <Calendar className="mr-2 h-4 w-4" />
                                View Calendar
                            </Button>
                            <Button size="sm">
                                <Plus className="mr-2 h-4 w-4" />
                                New Reminder
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-medium">Today's Reminders</CardTitle>
                                <Clock className="h-5 w-5 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{todayReminders.length}</div>
                                <p className="text-sm text-muted-foreground">
                                    {todayReminders.filter(r => r.status === 'completed').length} completed
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Link href="/reminders" className="w-full">
                                    <Button variant="outline" className="w-full justify-between">
                                        View all reminders
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-medium">Relations</CardTitle>
                                <User className="h-5 w-5 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{mockPersons.length}</div>
                                <p className="text-sm text-muted-foreground">
                                    {mockPersons.filter(p => p.relationship === 'family').length} family members
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Link href="/relations" className="w-full">
                                    <Button variant="outline" className="w-full justify-between">
                                        Manage relations
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-medium">Active Alerts</CardTitle>
                                <BellRing className="h-5 w-5 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{activeAlerts.length}</div>
                                <p className="text-sm text-muted-foreground">
                                    {activeAlerts.filter(a => a.severity === 'critical').length} critical alerts
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Link href="/alerts" className="w-full">
                                    <Button variant="outline" className="w-full justify-between">
                                        Manage alerts
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Upcoming Reminders</CardTitle>
                                <CardDescription>Your upcoming schedule for today</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {todayReminders.length > 0 ? (
                                        todayReminders.slice(0, 3).map(reminder => (
                                            <div key={reminder.id} className="flex items-center gap-4 rounded-lg border p-3">
                                                <div className={`rounded-full p-2 ${getPriorityColor(reminder.priority)}`}>
                                                    {getReminderIcon(reminder.type)}
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <p className="font-medium">{reminder.title}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {new Date(reminder.dateTime).toLocaleTimeString('en-US', {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                                <Button variant="ghost" size="sm">
                                                    View
                                                </Button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
                                            <p className="text-muted-foreground">No upcoming reminders for today</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Link href="/reminders" className="w-full">
                                    <Button variant="outline" className="w-full">View all reminders</Button>
                                </Link>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Relations</CardTitle>
                                <CardDescription>People you've recently interacted with</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentPersons.length > 0 ? (
                                        recentPersons.map(person => (
                                            <div key={person.id} className="flex items-center gap-4 rounded-lg border p-3">
                                                <img
                                                    src={person.imageUrl}
                                                    alt={person.name}
                                                    className="h-12 w-12 rounded-full object-cover"
                                                />
                                                <div className="flex-1 space-y-1">
                                                    <p className="font-medium">{person.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {person.relationship.charAt(0).toUpperCase() + person.relationship.slice(1)} •{' '}
                                                        {formatLastSeen(person.lastSeen)}
                                                    </p>
                                                </div>
                                                <Link href={`/relations/${person.id}`}>
                                                    <Button variant="ghost" size="sm">
                                                        View
                                                    </Button>
                                                </Link>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
                                            <p className="text-muted-foreground">No recent relations</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Link href="/relations" className="w-full">
                                    <Button variant="outline" className="w-full">View all relations</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Memory Exercises</CardTitle>
                                    <CardDescription>Daily activities to help strengthen memory</CardDescription>
                                </div>
                                <Brain className="h-6 w-6 text-primary" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3">
                                {['Face Recognition', 'Memory Game', 'Familiarity Quiz'].map((exercise, i) => (
                                    <Card key={i} className="overflow-hidden">
                                        <div className="aspect-video w-full bg-muted">
                                            <img
                                                src={`https://images.unsplash.com/photo-156${i + 1}001395398-a58cc1234abc?w=800&auto=format&fit=crop&q=60`}
                                                alt={exercise}
                                                className="h-full w-full object-cover transition-all hover:scale-105"
                                            />
                                        </div>
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold">{exercise}</h3>
                                            <p className="text-sm text-muted-foreground">Daily activity to strengthen memory</p>
                                        </CardContent>
                                        <CardFooter className="p-4 pt-0">
                                            <Button variant="outline" size="sm" className="w-full">
                                                Start Activity
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}

