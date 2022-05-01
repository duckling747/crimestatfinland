/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { memo } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from '@react-spring/web'
import { useAnimatedPath, useMotionConfig } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'

const ParallelCoordinatesLine = ({
    lineGenerator,
    points,
    strokeWidth,
    color,
    opacity,
}) => {
    const { hideTooltip } = useTooltip()

    const { animate, config: springConfig } = useMotionConfig()
    const animatedPath = useAnimatedPath(lineGenerator(points))
    const animatedProps = useSpring({
        color,
        opacity,
        config: springConfig,
        immediate: !animate,
    })
    return (
        <animated.path
            d={animatedPath}
            stroke={animatedProps.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            opacity={animatedProps.opacity}
            fill="none"
            onMouseLeave={hideTooltip}
        />
    )
}

ParallelCoordinatesLine.propTypes = {
    data: PropTypes.object.isRequired,
    variables: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })
    ).isRequired,
    lineGenerator: PropTypes.func.isRequired,
    points: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        })
    ).isRequired,
    strokeWidth: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    opacity: PropTypes.number.isRequired,
}

export default memo(ParallelCoordinatesLine)
