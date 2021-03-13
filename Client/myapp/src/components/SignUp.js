import React, { useEffect, useState } from 'react'
import { Form, Button, Card, Alert, Modal } from "react-bootstrap"
import { useAuth } from "../contextAPI/AuthContext"
import { useHistory, Link } from "react-router-dom"



export default function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    
    const {signUpFlag,signupFunc} = useAuth()
    const history = useHistory()


    useEffect(() =>
    {
        if(sessionStorage["auth"] && sessionStorage["token"])
        {
            history.push("/Main")
        }
    },[])

    useEffect(() =>
    {
        if(signUpFlag === true)
        {
            history.push("/")
        }

    },[signUpFlag])

    async function handleSubmit(e)
    {
        e.preventDefault()

        try{
            if(password !== passwordConfirm)
            {
                return setError("Passwords do not match")
            }
            setError("")
            setLoading(true)
            await signupFunc(email,password)
            if(!signUpFlag)
            {
                setError("user NOT in DB")
    
            }
        }catch(err)
        {
            setError("Failed to Sign-Up")
        }
        setLoading(false)


    }
    return (
        <>
            <Card style={{ maxWidth: "500px", marginLeft: "220px" }}>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Sign Up</Modal.Title>
                    </Modal.Header>
                </Modal.Dialog>
                <Modal.Body>

                    <Card.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} required />
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" onChange={(e) => setPasswordConfirm(e.target.value)} required />
                            </Form.Group>
                            <Modal.Footer>

                                <Button disabled={loading} className="w-100" type="submit">
                                    Sign Up
                         </Button>
                            </Modal.Footer>

                        </Form>

                    </Card.Body>
                </Modal.Body>

            </Card>
            <div style={{marginLeft : "220px"}}>
                Already have an account? <Link to="/">Log In</Link>
            </div>
        </>
    )
}
