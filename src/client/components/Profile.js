import React from 'react'
import styled from 'styled-components'
import { BREAKPOINTS, breakpoint } from '@aragon/ui'

import InformationPanel from './informationPanel'
// import OrganizationPanel from './OrganizationPanel'
import EducationPanel from './EducationPanel'
import WorkHistoryPanel from './WorkHistoryPanel'
import CoverImage from './CoverImage'

const Profile = () => (
  <React.Fragment>
    <CoverImage />
    <Grid>
      <InformationPanel />
      {/*
        For future reference: this will be re-enabled
        when it is possible to confirm membership in external DAOs.

        What is left in place: modal allowing to add membership record,
        events and all state-related code, incomplete styling for DAOs
        Membership Panel.
      <OrganizationPanel />
      */}
      <WorkHistoryPanel css="grid-row: span 2" />
      <EducationPanel />
    </Grid>
  </React.Fragment>
)

const Grid = styled.div`
  display: grid;
  grid-column-gap: 26px;
  margin: 0 auto;
  max-width: ${BREAKPOINTS.large}px;
  padding: 30px;
  padding-top: 0;
  width: 100%;
  ${breakpoint(
    'small',
    'grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));'
  )};
  ${breakpoint('large', 'grid-template-columns: 2fr 3fr')};
`

export default Profile
