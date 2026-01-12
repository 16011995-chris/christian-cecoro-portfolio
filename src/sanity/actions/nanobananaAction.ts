import { DocumentActionProps } from 'sanity';

export function NanobananaAction(props: DocumentActionProps) {
    // Only show on 'project' type
    if (props.type !== 'project') {
        return null;
    }

    return {
        label: 'Generate Mockups 🍌',
        onHandle: async () => {
            try {
                // Placeholder for API Call
                // const doc = props.draft || props.published;

                await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate work

                // Signal that the action is complete
                props.onComplete();

            } catch (err) {
                console.error('Generation Failed:', err);
            }
        }
    };
}
