import React, { useEffect, useState} from 'react'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser, fetchUserUpdate, setLoading } from '../../RTK/features/User/UserSlice'
import Loader from '../../Components/Loader/Loader'
import { capitalizeFirstLetter } from '../../utils/capitalized'
import { Navigate, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  // Local State
  const [toggle, setToggle] = useState(false)
  const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
  // Global State
  const {data} = useSelector(state => state.user)
  const {isLoading} = useSelector(state => state.user)
  const {error} = useSelector(state => state.user)
  // other Hook
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // Var
  const token = localStorage.getItem('token')

  useEffect(() => { 
    const forceLoad = async () => {
      setTimeout(() => {
        dispatch(setLoading(false))  
        }, 1000)
    }  
    token ? forceLoad() : navigate('/error') 
  }, [dispatch]);
  useEffect(()=>{
    if (data.body) {
      document.title = `ArgentBank - Profil ${data.body.firstName} ${data.body.lastName}`
    } 
  },[data.body])
  // Formulaire de changement Nom et Prénom
  const handleSubmit = (e) => {
    e.preventDefault()

		const updatedFirstName = firstName || data.body.firstName
		const updatedLastName = lastName || data.body.lastName
		const firstNameCap = capitalizeFirstLetter(updatedFirstName)
		const lastNameCap = capitalizeFirstLetter(updatedLastName)
		
		dispatch(fetchUserUpdate(
			{
				token, 
				firstName: firstNameCap, 
				lastName: lastNameCap
			}))
      dispatch(fetchUser(token))
      setToggle(!toggle)
      setTimeout(()=>{
        dispatch(setLoading(false))
      },1000)
      
      
	}
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          { error || !data.body ? (
          <Navigate to="/error" />
          ) :  (
            <>
              <Header />
              <main className="main bg-dark">
                <div className="header">
                  {toggle ? (
                    <form onSubmit={(e) => handleSubmit(e)}>
                      <div>
                        <input
                          type="text"
                          placeholder={data.body.firstName}
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder={data.body.lastName}
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                      <span className='error-form'></span>
                      <button className="edit-button" type="submit">Modifier</button>
                      <button className="edit-button" onClick={() => setToggle(!toggle)}>Annuler</button>
                    </form>
                  ) : (
                    <div className="header">
                      <h1>
                        Welcome back
                        <br />
                        {data.body.firstName} {data.body.lastName }!
                      </h1>
                      <button className="edit-button" onClick={() => setToggle(!toggle)}>
                        Edit Name
                      </button>
                    </div>
                  )}
                </div>
                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                  <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                  </div>
                  <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                  </div>
                </section>
                <section className="account">
                  <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                  </div>
                  <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                  </div>
                </section>
                <section className="account">
                  <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                  </div>
                  <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                  </div>
                </section>
              </main>
              <Footer />
            </>
          )} 
        </>
      )}
    </>
  );
}

export default Dashboard