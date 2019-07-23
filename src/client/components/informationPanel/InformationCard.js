import React, { Fragment, useContext, useState } from 'react'
import styled from 'styled-components'
import { Text, Card, theme } from '@aragon/ui'

import { ModalContext } from '../../wrappers/modal'
import { useProfile } from '../../hooks'
import { open } from '../../stateManagers/modal'
import { Social, IconPencil, IconEthereum } from '../styled-components'

import { GitHub, Twitter } from './SocialInfo'
import { Name, Description, Location, Website, Empty } from './BasicInfo'

const InformationCard = () => {
  const {
    ethereumAddress,
    description,
    name,
    location,
    website,
    twitter,
    github,
    userLoaded,
    viewMode,
  } = useProfile()
  const [activePopover, setPopover] = useState('')

  const { dispatchModal } = useContext(ModalContext)

  // return early if there is no profile to display
  if (!userLoaded) return <div />

  const handleOpenEdit = () => {
    dispatchModal(open('basicInformation'))
  }

  return (
    <StyledCard>
      <div>
        <Details>
          {!(name || description || location) ? (
            <Empty handleOpenEdit={handleOpenEdit} />
          ) : (
            <Fragment>
              <Name name={name} handleOpenEdit={handleOpenEdit} />
              <Description
                description={description}
                handleOpenEdit={handleOpenEdit}
              />
              <Location location={location} handleOpenEdit={handleOpenEdit} />
            </Fragment>
          )}
          <Website website={website} />
          <Separator />
          <Twitter
            twitter={twitter}
            activePopover={activePopover}
            setPopover={setPopover}
          />
          <GitHub
            github={github}
            activePopover={activePopover}
            setPopover={setPopover}
          />
          <Separator />
          <Social>
            <IconEthereum
              width="13px"
              height="13px"
              color={theme.textTertiary}
            />
            <EthAddr>{ethereumAddress}</EthAddr>
          </Social>
        </Details>
        {!viewMode && (
          <Icons>
            <IconPencil
              width="16px"
              color={theme.accent}
              onClick={handleOpenEdit}
            />
          </Icons>
        )}
      </div>
    </StyledCard>
  )
}

const StyledCard = styled(Card).attrs({ width: '100%', height: 'auto' })`
  border-top: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding: 20px;
  padding-top: 35px;
  position: relative;
`
const EthAddr = styled(Text).attrs({ size: 'small' })`
  color: ${theme.textTertiary};
  word-break: break-all;
`
const Icons = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  visibility: hidden;
  > * {
    background: white;
    box-sizing: content-box;
    padding: 4px;
    cursor: pointer;
  }
  ${StyledCard}:hover & {
    visibility: visible;
  }
`
const Details = styled.div`
  width: 100%;
  > :not(:last-child) {
    margin-bottom: 7px;
  }
`
const Separator = styled.hr`
  height: 1px;
  border: 0;
  width: 100%;
  margin: 13px 0 !important; // override Details > :not(:last-child)
  background: ${theme.contentBorder};
`

export default InformationCard
