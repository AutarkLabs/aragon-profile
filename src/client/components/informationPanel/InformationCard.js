import React, { Fragment, useContext, useState } from 'react'
import styled from 'styled-components'
import { Text, Card, theme } from '@aragon/ui'

import { ModalContext } from '../../wrappers/modal'
import { useProfile } from '../../hooks'
import { open } from '../../stateManagers/modal'
import { Social, IconPencil, IconEthereum } from '../styled-components'

import { RenderGitHub, RenderTwitter } from './InformationSocials'
import {
  RenderName,
  RenderDescription,
  RenderLocation,
  RenderWebsite,
  RenderEmpty,
} from './InformationItems'

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

  const handleOpenEdit = () => dispatchModal(open('basicInformation'))

  return (
    <StyledCard>
      <div>
        <Details>
          {!(name || description || location) ? (
            <RenderEmpty handleOpenEdit={handleOpenEdit} />
          ) : (
            <Fragment>
              <RenderName name={name} handleOpenEdit={handleOpenEdit} />
              <RenderDescription
                description={description}
                handleOpenEdit={handleOpenEdit}
              />
              <RenderLocation
                location={location}
                handleOpenEdit={handleOpenEdit}
              />
            </Fragment>
          )}
          <RenderWebsite website={website} />
          <Separator />
          <RenderTwitter
            twitter={twitter}
            activePopover={activePopover}
            setPopover={setPopover}
          />
          <RenderGitHub
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
  padding: 16px;
  padding-top: 52px;
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
