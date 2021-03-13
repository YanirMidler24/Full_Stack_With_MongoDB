import React, { useEffect, useState } from 'react'
import { Form, Button, Card, Alert, Modal } from "react-bootstrap"
import { useAuth } from "../contextAPI/AuthContext"


import { useHistory, Link } from "react-router-dom"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const { login, auth, token } = useAuth()
    const history = useHistory()

    useEffect(() =>
    {
        if(sessionStorage["auth"] && sessionStorage["token"])
        {
            history.push("/Main")
        }
    },[])



    useEffect(() => {

        if (auth && token) {
            
            sessionStorage["token"] = token
            sessionStorage["username"] = email
            sessionStorage["auth"] = auth
            
            history.push("/main")
        }
    }, [auth, token])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await login(email, password)
            if (!auth) {
                setError("Failed to log in")

            }
        } catch (err) {
            setError("Failed to log in")

        }
        setLoading(false)

    }
    return (
        <>
            <Card style={{ maxWidth: "500px", marginLeft: "250px" }}>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Log In</Modal.Title>
                    </Modal.Header>
                </Modal.Dialog>
                <Modal.Body>

                    <Card.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} required />
                            </Form.Group>
                            <Modal.Footer>

                                <Button disabled={loading} className="w-100" type="submit">
                                    LogIn
            </Button>
                            </Modal.Footer>

                        </Form>
                    </Card.Body>
                </Modal.Body>
            </Card>
            <div style={{marginLeft : "250px"}}>
                New User ? <Link to="/sign-up">create Account</Link>
            </div>

        </>
    )
}
