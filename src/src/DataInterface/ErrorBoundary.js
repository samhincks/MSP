class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        // You can also log error messages to an error reporting service here
    }

    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <Dialog onClose={handleDialogClose} aria-labelledby="customized-dialog-title" open={this.props.dialogOpen}>
                    <DialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
                    </DialogTitle>
                    <DialogContent >
                        <Typography gutterBottom>
                            {dialogMessage}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleDialogClose} color="primary">
                            OK
          </Button>
                    </DialogActions>
                </Dialog>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}