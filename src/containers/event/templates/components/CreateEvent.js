import React, { Component } from 'react'
import CreateEventForm from './CreateEventForm'



export default class CreateEvent extends Component {

    render() {
        return (
            <main className="builder mt-5">
                <section>
                    <form>
                        <CreateEventForm />
                    </form>
                </section>
                <section>
                    <button type="submit" className="submit">
                        Save
                 </button>
                </section>
            </main>
        )
    }
}
