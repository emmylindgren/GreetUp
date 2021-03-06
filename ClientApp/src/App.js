import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { LogIn } from './pages/LogIn';
import SignUp from './pages/SignUp';
//Ska flyttas från components till pages
import Explore from './pages/Explore';
import EventSD from './components/EventShortDetails';
import EventInformation from './pages/EventInformation';
import TemplatePage from './pages/TemplatePage';
import CreateEvent from './pages/CreateEvent';
import Schedule from './pages/Schedule';
import ProfilePage from './pages/ProfilePage';
//Ska flyttas från components till pages
import Attendees from './pages/Attendees';
import Audit from './pages/Audit';
import Wall from './pages/Wall';
import AttendeeInfo from './pages/AttendeeInfo';



import './custom.css'
import EditProfile from './pages/EditProfile';
import Comments from './pages/Comments';
import Badges from './pages/Badges';
import EditEvent from './pages/EditEvent';


export default function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path='/' element={<LogIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/schedule' element={<Schedule />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/wall' element={<Wall />} />
        <Route path='/event-information' element={<EventInformation />} />

        <Route path='/create-event' element={<TemplatePage />} />
        <Route path='/event-short-details' element={<EventSD />} />
        <Route path='/audit' element={<Audit />} />

        <Route path='/new-event' element={<CreateEvent />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/attendees' element={<Attendees />} />
        <Route path='/attendee-info' element={<AttendeeInfo />} />
        <Route path='/comments' element={<Comments />} />
        <Route path='/edit-profile' element={<EditProfile />} />
        <Route path='/badges' element={<Badges />} />
        <Route path='/edit-event' element={<EditEvent/>}/>
      </Routes>
    </Layout>
  );
}
