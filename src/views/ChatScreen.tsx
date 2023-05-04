import React, {memo, ReactElement, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';

import {myEmail} from '../Shared/Constants';
import {useCommentsLogic} from '../Shared/Logic';
import {ChatWrapper} from '../Shared/UI';
import { Comment } from '../Shared/Api';

const CommentCard = memo(({comment}: {comment: Comment}) => {
  const isMyEmail = comment.email === myEmail;
  return (
    <View
      style={[
        styles.commentCardContainer,
        isMyEmail && styles.myCommentCardContainer,
      ]}>
      <Text style={styles.textStyle}>{comment.body}</Text>
    </View>
  );
});

export const ChatScreen = (): ReactElement => {
  const {comments, addComment} =
    useCommentsLogic();

  const onNewMessage = useCallback(
    (text: string) => {
      addComment(text);
    },
    [addComment],
  );

  const renderItem = useCallback(({item}: ListRenderItemInfo<Comment>) => {
    return <CommentCard key={`comment-${item.id}`} comment={item} />;
  }, []);

  return (
    <ChatWrapper onNewMessage={onNewMessage}>
      <FlatList
        inverted
        data={comments}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        keyboardDismissMode="on-drag"
      />
    </ChatWrapper>
  );
};

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    paddingHorizontal: 12,
  },
  commentCardContainer: {
    maxWidth: '80%',
    marginVertical: 2,
    borderRadius: 12,
    backgroundColor: '#333333',
    paddingHorizontal: 6,
    paddingVertical: 10,
  },
  myCommentCardContainer: {
    backgroundColor: '#0085f2',
    alignSelf: 'flex-end',
  },
  textStyle: {
    fontSize: 16,
    letterSpacing: 0.25,
    color: 'white',
  },
  activityIndicator: {
    marginTop: 16,
    alignItems: 'center',
    marginBottom: 24,
    transform: [
      {
        scale: 0.85,
      },
    ],
  },
});
