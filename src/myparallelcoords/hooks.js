import { useMemo } from 'react'
import { line } from 'd3-shape'
import { scaleLinear, scalePoint } from 'd3-scale'
import { curveFromProp } from '@nivo/core'

export const computeParallelCoordinatesLayout = ({ width, height, data, variables, layout }) => {
    const variablesScale = scalePoint()
        .range(layout === 'horizontal' ? [0, width] : [height, 0])
        .domain(variables.map(({ key }) => key))

    const range = layout === 'horizontal' ? [height, 0] : [0, width]
    
    var variablesWithScale = new Array(variables.length);
    for (var i = variables.length-1; i >= 0; i--) {
        const allValues = new Set()
        for (const d of data) {
            allValues.add(d[variables[i].key]);
        }

        var scale;
        if (variables[i].type === 'linear') {
            const min =
                variables[i].min !== undefined && variables[i].min !== 'auto'
                    ? variables[i].min
                    : Math.min(...Array.from(allValues))
            const max =
                variables[i].max !== undefined && variables[i].max !== 'auto'
                    ? variables[i].max
                    : Math.max(...Array.from(allValues))

            scale = scaleLinear().rangeRound(range).domain([min, max])
        }

        if (variables[i].type === 'point') {
            scale = scalePoint()
                .range(range)
                .domain(variables[i].values || allValues)

            if (variables[i].padding !== undefined) {
                scale.padding(variables[i].padding)
            }
        }
        variablesWithScale[i] = {
            ...variables[i],
            scale,
            values: Array.from(allValues),
        }
    }

    var dataWithPoints = new Array(data.length);
    for (i = data.length-1; i >= 0; i--) {
        var points = new Array(variablesWithScale.length);
        for (var j = variablesWithScale.length-1; j >= 0; j--) {
            points[j] = {
                x:
                    layout === 'horizontal'
                        ? variablesScale(variablesWithScale[j].key)
                        : variablesWithScale[j].scale(data[i][variablesWithScale[j].key]),
                y:
                    layout === 'horizontal'
                        ? variablesWithScale[j].scale(data[i][variablesWithScale[j].key])
                        : variablesScale(variablesWithScale[j].key),
            };
        }
        dataWithPoints[i] = { index: i, ...data[i], points };
    }

    return {
        variablesScale,
        variablesWithScale,
        dataWithPoints,
    }
}


export const useParallelCoordinates = ({
    width,
    height,
    data,
    variables,
    layout,
    curve,
}) => {

    const lineGenerator = useMemo(
        () =>
            line()
                .x(d => d.x)
                .y(d => d.y)
                .curve(curveFromProp(curve)),
        [curve]
    )

    const { variablesScale, variablesWithScale, dataWithPoints } = useMemo(
        () =>
            computeParallelCoordinatesLayout({
                width,
                height,
                data,
                variables,
                layout,
            }),
        [width, height, data, variables, layout]
    )

    return {
        variablesScale,
        variablesWithScale,
        dataWithPoints,
        lineGenerator,
    }
}
