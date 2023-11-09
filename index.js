


function createExecutor(flowDocument, activities) {

    return ({
        execute: async function (state) {

            const { entryNodeName, nodes, } = flowDocument;
            let node = nodes[entryNodeName];

            while (true) {
                const activity = activities[node.name];
                const outputPort = await activity(state);
                if (outputPort === null || outputPort === undefined) {
                    break;
                }
                const nextNodeName = node.outputPorts[outputPort];
                node = nodes[nextNodeName];
            }

            return state;
        }
    });
}


export default {
    createExecutor,
};