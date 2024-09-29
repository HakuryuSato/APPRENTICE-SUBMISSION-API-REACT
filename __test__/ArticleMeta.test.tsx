/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import ArticleMeta from "@/app/_components/Article/ArticleMeta";
import { AuthContext } from "@/app/_contexts/AuthContext";
import "@testing-library/jest-dom";
import type { Article } from "@custom-types/article";



describe("ArticleMeta", () => {
  const article: Article = {
    author: {
      username: "authoruser",
      image: "https://api.realworld.io/images/author.png",
      bio: "",
    },
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-02T00:00:00.000Z",
    favorited: false,
    favoritesCount: 0,
    slug: "test-article",
    title: "Test Article",
    description: "This is a test article",
    body: "This is the body of the test article",
    tagList: [],
    favorites: [],
  };

  it("renders article meta correctly when user is not the author", () => {
    const user = {
      username: "jest_test_user",
      image: "https://api.realworld.io/images/other-user.png",
      email: "user@example.com",
      password: "password",
      bio: "",
    };

    const mockAuthContextValue = {
      user,
      login: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
    };

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <ArticleMeta article={article} />
      </AuthContext.Provider>,
    );

    // 著者画像が表示されていることを確認
    const authorImage = screen.getByAltText(article.author.username);
    expect(authorImage).toBeInTheDocument();

    // フォローボタンが表示されていることを確認
    const followButton = screen.getByRole("button", {
      name: /follow authoruser/i,
    });
    expect(followButton).toBeInTheDocument();

    // お気に入りボタンが表示されていることを確認
    const favoriteButton = screen.getByRole("button", {
      name: /favorite post/i,
    });
    expect(favoriteButton).toBeInTheDocument();

    // 編集・削除ボタンが表示されていないことを確認
    const editButton = screen.queryByRole("button", { name: /edit article/i });
    const deleteButton = screen.queryByRole("button", {
      name: /delete article/i,
    });
    expect(editButton).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
  });
});
