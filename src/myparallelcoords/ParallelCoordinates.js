/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { SvgWrapper, useDimensions, withContainer } from '@nivo/core'
import { Axis } from '@nivo/axes'
import { svgPropTypes, svgDefaultProps } from './props'
import { useParallelCoordinates } from './hooks'
import ParallelCoordinatesLine from './ParallelCoordinatesLine'

const ParallelCoordinates = ({
    data,
    variables,
    layout,
    width,
    height,
    margin: partialMargin,
    axesPlan,
    axesTicksPosition,
    strokeWidth,
    lineOpacity,
    curve,
    colors,
    role,
    selected
}) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { variablesScale, variablesWithScale, dataWithPoints, lineGenerator } =
        useParallelCoordinates({
            width: innerWidth,
            height: innerHeight,
            data,
            variables,
            layout,
            colors,
            curve,
        })

    var axes = new Array(variablesWithScale.length);
    for (var i = variablesWithScale.length-1; i >= 0; i--) {
        axes[i] = <Axis
            key={variablesWithScale[i].key}
            axis={layout === 'horizontal' ? 'y' : 'x'}
            length={layout === 'horizontal' ? innerHeight : innerWidth}
            x={layout === 'horizontal' ? variablesScale(variablesWithScale[i].key) : 0}
            y={layout === 'horizontal' ? 0 : variablesScale(variablesWithScale[i].key)}
            scale={variablesWithScale[i].scale}
            ticksPosition={variablesWithScale[i].ticksPosition || axesTicksPosition}
            tickValues={variablesWithScale[i].tickValues}
            tickSize={variablesWithScale[i].tickSize}
            tickPadding={variablesWithScale[i].tickPadding}
            tickRotation={variablesWithScale[i].tickRotation}
            format={variablesWithScale[i].tickFormat}
            legend={variablesWithScale[i].legend}
            legendPosition={variablesWithScale[i].legendPosition}
            legendOffset={variablesWithScale[i].legendOffset}
        />
    }

    var tmp, out = new Array(dataWithPoints.legend), j;
    for (i = dataWithPoints.length-1, j = 0; i >= 0; i--) {
        const thisIsSelected = dataWithPoints[i].Alue.endsWith(selected);
        const tmm = <ParallelCoordinatesLine
            key={dataWithPoints[i].index}
            data={dataWithPoints[i]}
            variables={variables}
            lineGenerator={lineGenerator}
            points={dataWithPoints[i].points}
            // Allow highlighting for goodness' sake:
            strokeWidth={thisIsSelected ? 5 : strokeWidth}
            opacity={thisIsSelected ? 1 : lineOpacity}
            color={thisIsSelected ? "#FF3131" : "#808080"}
        />;
        if (thisIsSelected) {
            tmp = tmm;
        } else {
            out[j++] = tmm;
        }
    }
    out[j] = tmp;
    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} role={role} >
            {axesPlan === 'background' && axes}
            {out}
            {axesPlan === 'foreground' && axes}
        </SvgWrapper>
    )
}

ParallelCoordinates.propTypes = svgPropTypes

const WrappedParallelCoordinates = withContainer(ParallelCoordinates)
WrappedParallelCoordinates.defaultProps = svgDefaultProps

export default WrappedParallelCoordinates
