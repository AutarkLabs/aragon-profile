import React from 'react'
import styled from 'styled-components'
import { breakpoint } from '@aragon/ui'

import InformationPanel from './informationPanel'
// import OrganizationPanel from './OrganizationPanel'
import EducationPanel from './EducationPanel'
import WorkHistoryPanel from './WorkHistoryPanel'
import CoverImage from './CoverImage'
import { ContentWrap } from './styled-components'

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
      <WorkHistoryPanel css="grid-row: span 20" />
      <EducationPanel />
    </Grid>
  </React.Fragment>
)

const Grid = styled(ContentWrap)`
  display: grid;
  grid-column-gap: 26px;
  ${breakpoint(
    'small',
    'grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));'
  )};
  ${breakpoint('large', 'grid-template-columns: 2fr 3fr')};
`

export default Profile
