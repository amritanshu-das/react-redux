import React, { useEffect, useState, useContext, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import './App.scss';
import { UserContext } from './shared/context/UserContext';
import { Header, Footer, ProtectedRoute, setFullState } from './shared';
import { useDispatch } from 'react-redux';

const Home = loadable(() => import('./home/Home'), {
  fallback: <div>Loading...</div>
});
const Login = loadable(() => import('./account/Login'), {
  fallback: <div>Loading...</div>
});
const Dashboard = loadable(() => import('./account/protected/Dashboard'), {
  fallback: <div>Loading...</div>
});
const Clp = loadable(() => import('./browse/shell/Clp'), {
  fallback: <div>Loading...</div>
});
const Plp = loadable(() => import('./browse/shell/Plp'), {
  fallback: <div>Loading...</div>
});

const App: React.FC = () => {

  const [initialData, setInitialData]: any = useState({});
  const dispatch = useDispatch();

  const initialCalls = () => {
    let intialDataMap: any = {};

    fetch('/rest/model/com/ws/multisite/actor/SiteActor/siteInfo').then(result => {
      if (result.ok) {
        return result.json();
      } else {
        throw Error(result.statusText);
      }
    }).then(siteInfo => {
      intialDataMap['siteInfo'] = siteInfo;

      fetch('/rest/model/atg/userprofiling/ProfileActor/init').then(result => {
        if (result.ok) {
          return result.json();
        } else {
          throw Error(result.statusText);
        }
      }).then(initData => {
        dispatch(setFullState(initData.data[0]));
        intialDataMap['initData'] = initData;
        fetch('/ws/headerfooter?format=json').then(result => {
          if (result.ok) {
            return result.json();
          } else {
            throw Error(result.statusText);
          }
        }).then(headerfooter => {
          intialDataMap['headerfooterData'] = headerfooter;
          setInitialData(intialDataMap);
          console.log(localStorage.getItem('sessionConfNo'));
          if (localStorage.getItem('sessionConfNo') === null) {
            fetch('/rest/model/atg/rest/SessionConfirmationActor/getSessionConfirmationNumber').then(result => {
              if (result.ok) {
                return result.json();
              } else {
                throw Error(result.statusText);
              }
            }).then(sessionData => {
              localStorage.setItem('sessionConfNo', sessionData.sessionConfNo);
            }).catch(error => {
              console.log("error");
            })
          }

        }).catch(error => {
          console.log("error");
        })
      }).catch(error => {
        console.log("error");
      })
    }).catch(error => {
      console.log("error", error);
    })
  }

  useEffect(() => {
    initialCalls();
  }, [])


  return (

    <div className="App">

      {initialData['siteInfo'] ?
        <UserContext.Provider value={initialData}>
          <Router>
            <Header headerdata={initialData['headerfooterData']} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/view-products/:catlevl1/:catlevl2/_/:nvalue" children={<Clp />} />
              <Route path="/view-products/:catlevl1/:catlevl2/:catlevl3/_/:nvalue" children={<Clp />} />
              <ProtectedRoute exact path="/account/dashboard">
                <Dashboard />
              </ProtectedRoute>
            </Switch>
            <Footer footerdata={initialData['headerfooterData']} />
          </Router>
        </UserContext.Provider>
        : 'Loading....'}
    </div>

  );
}

export default App;
