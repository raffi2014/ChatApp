import {useState} from 'react';

import {myEmail} from '../Constants';
import { Comment } from '../Api';

export interface CommentsLogic {
  comments: Comment[];
  addComment: (text: string) => void;
}

const TOTAL_BACK_END_COMMENTS = 500;

export const useCommentsLogic = (): CommentsLogic => {
  const [comments, setComments] = useState<Comment[]>([{
    postId: 1,
    id: Math.random(),
    name: 'SAKHI Idris',
    email: 'sak@me.com',
    body: 'hello',
  },
  {
    postId: 1,
    id: Math.random(),
    name: 'SAKHI Idris',
    email: 'sak@me.com',
    body: 'Good morning'
  },
  {
    postId: 1,
    id: Math.random(),
    name: 'SAKHI Idris',
    email: 'sak@me.com',
    body: 'Have a nice day'
  },
  {
    postId: 1,
    id: Math.random(),
    name: 'SAKHI Idris',
    email: 'sak@me.com',
    body: 'Reply me'
  }]);


  const addComment = (text: string) => {
    setComments(prev => [
      {
        postId: 1,
        id: Math.random(),
        name: 'SAKHI Idris',
        email: myEmail,
        body: text,
      },
      ...prev,
    ]);
  };

  return {
    comments,
    addComment,
  };
};
