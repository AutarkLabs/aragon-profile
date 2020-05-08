import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Layout, breakpoint } from '@aragon/ui'

import InformationPanel from './informationPanel'
// import OrganizationPanel from './OrganizationPanel'
import EducationPanel from './EducationPanel'
import WorkHistoryPanel from './WorkHistoryPanel'
import CoverImage from './CoverImage'
import { ContentWrap } from './styled-components'
const Profile = ({ appWidth }) => {
  console.log('profile app width: ', appWidth)
  return (
    <React.Fragment>
      <CoverImage />
      <Layout parentWidth={appWidth}>
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
      </Layout>
    </React.Fragment>
  )
}

Profile.propTypes = {
  appWidth: PropTypes.number.isRequired,
}

const Grid = styled(ContentWrap)`
  display: grid;
  grid-column-gap: 26px;
  ${breakpoint('large', 'grid-template-columns: 2fr 3fr')};
`

export default Profile
