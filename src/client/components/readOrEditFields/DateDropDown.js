import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Transition, animated } from 'react-spring'
import ClickOutHandler from 'react-onclickout'
import { springs, unselectable, useTheme } from '@aragon/ui'
import DropDownItem from './DropDownItem'
import arrow from '../../../../assets/arrow-down.svg'
const NON_BREAKING_SPACE = '\xa0'

const assetsPath = asset => asset.replace(/.*\//, '/')

const StyledDropDown = styled.div`
  z-index: ${({ opened }) => (opened ? '2' : '0')};
  display: ${({ wide }) => (wide ? 'flex' : 'inline-flex')};
  flex-direction: column;
  color: ${({ theme }) => theme.content};
  white-space: nowrap;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.03);
  ${unselectable()};
  &:focus {
    outline: 0;
  }
`

const DropDownItems = styled(animated.div)`
  position: absolute;
  z-index: 2;
  top: 30px;
  bottom: 30px;
  padding: 8px 0;
  color: ${({ theme }) => theme.content};
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.06);
  border-radius: 3px;
  list-style: none;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 150px;
`

const BlockingLayer = styled(animated.div)`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const DropDownActiveItem = styled(DropDownItem)`
  padding-right: 40px;
  background: ${({ theme }) => theme.surface};
  background-image: url(${assetsPath(arrow)});
  background-repeat: no-repeat;
  background-position: calc(100% - 15px) 50%;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 3px;
  &:hover,
  &:focus {
    color: inherit;
  }
  &:active {
    color: ${({ theme }) => theme.content};
  }
`

const DateDropDown = ({
  items = [],
  wide = false,
  active = 0,
  onChange = () => {},
}) => {
  const theme = useTheme()
  const [opened, setOpened] = useState(false)
  const [activeItemElt, setActiveItemElt] = useState()
  const activeItem = items[active] || items[0]

  const handleToggle = () => setOpened(!opened)
  const handleClose = () => setOpened(false)
  const handleItemActivate = (index, { keyboard }) => {
    onChange(index, items)
    setOpened(false)
    if (activeItemElt && keyboard) {
      activeItemElt.focus()
    }
  }

  return (
    <ClickOutHandler onClickOut={handleClose}>
      <StyledDropDown theme={theme} wide={wide} opened={opened}>
        <DropDownActiveItem
          theme={theme}
          onActivate={handleToggle}
          mainRef={el => setActiveItemElt(el)}
        >
          {activeItem}
        </DropDownActiveItem>
        <Transition
          config={springs.swift}
          items={opened}
          from={{ scale: 0.98, opacity: 0, enabled: 1 }}
          enter={{ scale: 1, opacity: 1, enabled: 1 }}
          leave={{ scale: 1, opacity: 0, enabled: 0 }}
          native
        >
          {opened =>
            opened &&
            (({ scale, opacity, enabled }) => (
              <DropDownItems
                theme={theme}
                role="listbox"
                style={{
                  opacity,
                  transform: scale.interpolate(t => `scale3d(${t},${t},1)`),
                }}
              >
                {items.length
                  ? items.map((item, i) => (
                      <DropDownItem
                        role="option"
                        key={i}
                        index={i}
                        active={i === active}
                        onActivate={handleItemActivate}
                      >
                        {item}
                      </DropDownItem>
                    ))
                  : NON_BREAKING_SPACE}
                <BlockingLayer
                  style={{
                    display: enabled.interpolate(t =>
                      t === 1 ? 'none' : 'block'
                    ),
                  }}
                />
              </DropDownItems>
            ))
          }
        </Transition>
      </StyledDropDown>
    </ClickOutHandler>
  )
}

DateDropDown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node),
  wide: PropTypes.bool,
  active: PropTypes.number,
  onChange: PropTypes.func,
}

export default DateDropDown
