import React from 'react';
import Layout from '../components/layout';
import Nav from '../components/nav';
import SEO from '../components/seo';

import './contact.css';
import Thanks from './thanks';

const Contact = () => (
    <Layout>
        <SEO title='Contact' description='Contact David Quan: Your Most Awesome Human Being' />
        <Nav />
        <div className='contact__header'></div>
        <div className='contact__section'></div>
            <div className='contact__form'>
                <h1>Contact</h1>
                <div className='inner'>
                    <form method='post' name='contact' action='/thanks' data-netlify='true' netlify-honeypot='bot'>
                        <input type='hidden' name='form-name' value='contact' />
                        <div className='field__hidden'>
                            <label>Don't fill this out, human</label>
                            <input name='bot' />
                        </div>
                        <div className='field'>
                            <label>Name</label>
                            <input type='text' name='name' />
                        </div>
                        <div className='field'>
                            <label>Email</label>
                            <input type='text' name='name' />
                        </div>
                        <div className='field'>
                            <label>Message</label>
                            <textarea name='message' rows ='6'></textarea>
                        </div>
                        <div className='submit'>
                            <button type='submit' className='btn__med'>Send</button>
                        </div>
                    </form>
                </div>
            </div>
    </Layout>
)

export default Contact