/*
This is an unused component, removed from Header.js (where it was commented out) on 4/12/2020.
It provides the interface logic for logging in which may be a future feature of the website. 
*/

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        minWidth: "300px",
    },
    button: {
        float: "right",
        color: "#0A314D",
    },
    textField: {
        width: "100%",
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
    },
    formItem: {
        marginBottom: "20px",
    },
    submitButton: {},
    logoText: {
        paddingLeft: "10vh",
    },
    accountIcon: {
        paddingRight: 10,
    },
    [theme.breakpoints.down("xs")]: {
        logo: {},
    }
}));

/* Note this modal has been pulled out of the header class. It is not in use currently*/
// eslint-disable-next-line
export default function LoginModal() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [{ user }, dispatch] = useStateValue();
    const [form, setValues] = React.useState({
        username: "",
        password: "",
    });
    const handleClose = () => {
        setOpen(false);
    };

    const printValues = (e) => {
        e.preventDefault();
        console.log(form.username, form.password);
        dispatch({
            type: "changeUserPassword",
            newUser: { user: form.username, password: form.password },
        });
        setValues({
            username: "",
            password: "",
        });

        setOpen(false);
    };

    const updateField = (e) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={() => setOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">Login</h2>

                    <form onSubmit={printValues} className={classes.formContainer}>
                        <TextField
                            value={form.username}
                            label="User Name"
                            name="username"
                            onChange={updateField}
                            className={classes.formItem}
                        />

                        <TextField
                            value={form.password}
                            label="Password"
                            name="password"
                            type="password"
                            onChange={updateField}
                            className={classes.formItem}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submitButton}
                        >
                            Submit
              </Button>
                    </form>
                </div>
            </Fade>
        </Modal>
    );
};
