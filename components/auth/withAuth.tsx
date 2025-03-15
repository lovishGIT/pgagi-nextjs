import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export function withAuth(gssp?: GetServerSideProps) {
    return async (context: GetServerSidePropsContext) => {
        const session = await getServerSession(
            context.req,
            context.res,
            authOptions
        );

        if (!session) {
            return {
                redirect: {
                    destination: '/auth/signin',
                    permanent: false,
                },
            };
        }

        if (gssp) {
            const gsspResult = await gssp(context);
            if ('props' in gsspResult) {
                return {
                    props: {
                        ...gsspResult.props,
                        session,
                    },
                };
            }
            return gsspResult;
        }

        return {
            props: { session },
        };
    };
}