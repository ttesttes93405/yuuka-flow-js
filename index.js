


export function createExecutor(flowDocument, activities) {

    return ({
        execute: async function (state) {

            const { entryNodeName, nodes, } = flowDocument;
            let node = nodes[entryNodeName];

            while (true) {
                const activity = activities[node.name];
                if (activity === undefined)
                    break;

                const outputPort = await activity(state);
                if (outputPort === undefined || outputPort === null)
                    break;

                const nextNodeName = node.outputPorts[outputPort];
                node = nodes[nextNodeName];
                if (node === undefined)
                    break;
            }

            return state;
        }
    });
}