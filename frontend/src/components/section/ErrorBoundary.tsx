import React, { ErrorInfo } from 'react';
import { Alert } from '@material-ui/lab';

interface ErrorBoundaryState {
    hasError: boolean;
}

export default class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        this.setState({ hasError: true });
    }

    render(): any {
        if (this.state.hasError) {
            return (
                <Alert severity="error">Something happened that broke the code. Please refresh and try again.</Alert>
            );
        }
        return this.props.children;
    }
}
