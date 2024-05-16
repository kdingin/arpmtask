public function createPost(Request $request, Author $author = null) {

try {
  // Validate title
  $request->validate([
    'title' => 'required|unique:posts,title'
  ]);

  if (!$author) {
    $author = Author::find($request->author_id);
  }

  // Create the post
  $post = $author->posts()->create([
    'title' => $request->title,
    'status' => 'published'
  ]);

  // Attach category to the post (assuming a many-to-many relationship)
  $post->categories()->attach($request->categoryId);

  return response()->json([
    'message' => 'Post created successfully!',
    'post' => $post
  ]);
} catch (ValidationException $e) {
  return response()->json([
    'message' => 'Validation failed',
    'errors' => $e->validator->errors()
  ], 422); // Unprocessable Entity
} catch (\Exception $e) {
  // Log the error and return a generic error message
  report($e);
  return response()->json([
    'message' => 'An error occurred while creating the post.'
  ], 500); // Internal Server Error
}
}