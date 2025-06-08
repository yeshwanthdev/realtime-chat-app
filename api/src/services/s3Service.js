const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { Readable } = require('stream');

class S3Service {
	constructor({ bucketName, region, accessKeyId, secretAccessKey }) {
		this.bucketName = bucketName;
		this.s3Client = new S3Client({
			region,
			credentials: {
				accessKeyId,
				secretAccessKey,
			},
		});
	}

	// POST/PUT: Upload or update an object
	async createObject({ key, data, contentType }) {
		const command = new PutObjectCommand({
			Bucket: this.bucketName,
			Key: key,
			Body: data,
			ContentType: contentType,
		});
		await this.s3Client.send(command);
		return { message: 'Object created', key };
	}

	// GET: Retrieve an object
	async getObject(key) {
		const command = new GetObjectCommand({
			Bucket: this.bucketName,
			Key: key,
		});
		const response = await this.s3Client.send(command);
		return this.#streamToBuffer(response.Body);
	}

	// DELETE: Remove an object
	async deleteObject(key) {
		const command = new DeleteObjectCommand({
			Bucket: this.bucketName,
			Key: key,
		});
		await this.s3Client.send(command);
		return { message: 'Object deleted', key };
	}

	// GET: List all objects (with optional prefix)
	async listObjects(prefix = '') {
		const command = new ListObjectsV2Command({
			Bucket: this.bucketName,
			Prefix: prefix,
		});
		const { Contents } = await this.s3Client.send(command);
		return Contents?.map((obj) => obj.Key) || [];
	}

	// GET (special case): Presigned URL
	async getPresignedUrl(key, expiresInSeconds = 3600) {
		const command = new GetObjectCommand({
			Bucket: this.bucketName,
			Key: key,
		});
		return await getSignedUrl(this.s3Client, command, {
			expiresIn: expiresInSeconds,
		});
	}

	// Private helper
	#streamToBuffer(stream) {
		return new Promise((resolve, reject) => {
			const chunks = [];
			stream.on('data', (chunk) => chunks.push(chunk));
			stream.on('end', () => resolve(Buffer.concat(chunks)));
			stream.on('error', reject);
		});
	}
}

module.exports = S3Service;
