import React from 'react';

declare module 'react' {
    namespace JSX {
        interface IntrinsicAttributes {
            children?: React.ReactNode;
        }
    }

    interface FunctionComponent<P = {}> {
        (
            props: React.PropsWithChildren<P>,
            context?: any
        ): React.ReactElement<any, any> | null;
    }
}

declare module 'cmdk' {
    export interface CommandProps {
        children?: React.ReactNode;
        [key: string]: any;
    }

    export class Command extends React.Component<CommandProps> {
        static Input: React.FC<any>;
        static List: React.FC<any>;
        static Empty: React.FC<any>;
        static Group: React.FC<any>;
        static Item: React.FC<any>;
        static Separator: React.FC<any>;
    }
}
