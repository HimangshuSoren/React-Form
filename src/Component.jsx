import { Fragment, useState, useRef, useTransition } from 'react'
import update from './assets/update.gif'

export default function Component() {
    const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '', gender: '', termsAccepted: false, showPassword: false })
    const [isPending, startTransition] = useTransition()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const submitButtonRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        for (const key in formData) { if (key !== 'showPassword' && !formData[key]) { throw new Error(`Please fill in the ${key} field`) } }
        startTransition(() => { setIsSubmitting(true) })
        await new Promise(resolve => { setTimeout(() => { console.log(formData); startTransition(() => { setIsSubmitting(false) }); resolve() }, 5000) })
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        startTransition(() => { setFormData(prevData => ({ ...prevData, [name]: type === 'checkbox' ? checked : value })) })
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
                <>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </>
                <>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
                </>
                <>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </>
                <>
                    <label htmlFor="password">Password:</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input type={formData.showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleChange} />
                        <button type="button" onClick={() => startTransition(() => { setFormData(prev => ({ ...prev, showPassword: !prev.showPassword })) })}>{formData.showPassword ? "Hide" : "Show"}</button>
                    </div>
                </>
                <div style={{ gridColumn: '1 / -1' }}>
                    <label>Gender:</label>
                    <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> Male<input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> Female</div>
                <div style={{ gridColumn: '1 / -1' }}>
                    <label><input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />I accept the terms and conditions</label></div>
                <button type="submit" ref={submitButtonRef} disabled={isSubmitting || isPending} style={{ gridColumn: '1 / -1' }}>{isSubmitting ? 'Please Wait...' : 'Submit'}</button>
                {isSubmitting && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                        <img src={update} alt="Loading..." style={{ width: '100px', height: '100px' }} />
                    </div>
                )}
            </form>
        </Fragment>
    )
}
