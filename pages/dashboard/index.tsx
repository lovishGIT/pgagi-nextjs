import React from 'react';
import Layout from '@/components/global/Layout';
import { useAuth } from '@/hooks/useAuth';
import { withAuth } from '@/components/auth/withAuth';

export default function Dashboard() {
    const { session } = useAuth();

    return (
        <Layout>
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <p>
                    Welcome to your dashboard, {session?.user?.name}!
                </p>
                <p>Your email: {session?.user?.email}</p>
            </div>
        </Layout>
    );
}

export const getServerSideProps = withAuth();
