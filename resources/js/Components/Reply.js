import React from "react";
import Button from "@/Components/Button";
import { Link, useForm } from "@inertiajs/inertia-react";
import ReplyBlock from "./ReplyBlock";

export default function Reply({ thread, auth }) {
    const { data, setData, post, reset } = useForm({
        body: "",
        parent_id: "",
    });

    const ShowReplyForm = (oke) => {
        setData({
            ...data,
            parent_id: oke.id,
        });
    }

    const handleChange = (e) => setData(e.target.name, e.target.value);
    const replyStoreHandler = (e) => {
        e.preventDefault();
        post(route("replies.store", thread.data.slug), {
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    };
    return (
        <div className="lg:ml-6">
            {thread.replies.length
                ? thread.replies.map((reply) => (
                    <ReplyBlock key={reply.id} {...{ reply, thread, auth, data, setData, ShowReplyForm, replyStoreHandler, handleChange }} />
                ))
                : "no thread."}

            {auth.user ? !data.parent_id && (
                <form onSubmit={replyStoreHandler}>
                    <div className="flex">
                        <div className="hidden lg:block flex-shrink-0 mr-3">
                            <img src={auth.user.picture} alt={auth.user.name} className="h-8 w-8 rounded-full" />
                        </div>
                        <div className="w-full">
                            <div className="mb-2">
                                <textarea placeholder="Write your comment here . . ." className="bg-white w-full rounded-lg shadow resize-none border-transparent focus:border-blue-400 focus:ring focus:ring-blue-100 transition duration-200" name="body" value={data.body} onChange={handleChange} />
                            </div>
                            <div className="flex justify-end">
                                <Button>Reply</Button>
                            </div>
                        </div>
                    </div>
                </form>
            ) : ''}
        </div>
    );
}
